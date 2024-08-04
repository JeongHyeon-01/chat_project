from rest_framework import generics, permissions
from .models import ChatRoom, Message
from .serializers import ChatRoomSerializer, MessageSerializer
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework.views import APIView

User = get_user_model()

class ChatRoomList(generics.ListCreateAPIView):
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomSerializer
    permission_classes = [permissions.IsAuthenticated]

class ChatRoomDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomSerializer
    permission_classes = [permissions.IsAuthenticated]

class MessageList(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

class MessageDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserChatRoomListView(generics.ListAPIView):
    serializer_class = ChatRoomSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ChatRoom.objects.filter(participants=self.request.user)

class CreateChatRoomView(generics.CreateAPIView):
    serializer_class = ChatRoomSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        participant_id = request.data.get('participant_id')
        if not participant_id:
            return Response({"error": "Participant ID is required"}, status=400)
        
        try:
            participant = User.objects.get(id=participant_id)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

        # 채팅방의 이름을 참여자의 이름으로 설정
        chat_room = ChatRoom.objects.create(name=participant.name)
        chat_room.participants.add(request.user, participant)
        chat_room.save()

        return Response(ChatRoomSerializer(chat_room).data, status=201)

class MessageListCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, room_name):
        chat_room = ChatRoom.objects.get(name=room_name)
        messages = Message.objects.filter(chat_room=chat_room).order_by('timestamp')
        # 메시지를 읽음으로 표시
        for message in messages:
            if message.sender != request.user and not message.read:
                message.read = True
                message.save()
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)

    def post(self, request, room_name):
        chat_room = ChatRoom.objects.get(name=room_name)
        user = request.user
        content = request.data.get('message')

        message = Message.objects.create(
            chat_room=chat_room,
            sender=user,
            content=content,
            read=False  # 새 메시지는 읽지 않은 상태로 설정
        )
        serializer = MessageSerializer(message)
        return Response(serializer.data)
    
    
    
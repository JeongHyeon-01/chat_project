from django.urls import path
from . import views

app_name = 'chat'

urlpatterns = [
    path('rooms/', views.ChatRoomList.as_view(), name='chatroom-list'),
    path('rooms/<int:pk>/', views.ChatRoomDetail.as_view(), name='chatroom-detail'),
    path('messages/', views.MessageList.as_view(), name='message-list'),
    path('messages/<int:pk>/', views.MessageDetail.as_view(), name='message-detail'),
    path('user_chatrooms/', views.UserChatRoomListView.as_view(), name='user-chatrooms'),
    path('create_chatroom/', views.CreateChatRoomView.as_view(), name='create-chatroom'),
    path('messages/<str:room_name>/', views.MessageListCreateView.as_view(), name='message-list-create'),
]

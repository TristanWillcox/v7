import React, { useState } from 'react';
      import { Bell, Star, Users, MessageSquare, UserPlus, Check } from 'lucide-react';
      import { useProject } from '../contexts/ProjectContext';

      const initialNotifications = [
        {
          id: 1,
          type: 'collaboration',
          icon: Users,
          message: 'Sarah invited you to collaborate on "Digital Dreams"',
          time: '2 minutes ago',
          unread: true
        },
        {
          id: 2,
          type: 'message',
          icon: MessageSquare,
          message: 'New message in Sound Designers United',
          time: '1 hour ago',
          unread: true
        },
        {
          id: 3,
          type: 'feature',
          icon: Star,
          message: 'Your project "Ethereal Soundscapes" was featured',
          time: '2 hours ago',
          unread: false
        },
        {
          id: 4,
          type: 'friendRequest',
          icon: UserPlus,
          message: 'Bob sent you a friend request',
          time: '5 minutes ago',
          unread: true,
          sender: 'Bob'
        }
      ];

      export function Notifications() {
        const { activeColor } = useProject();
        const [notifications, setNotifications] = useState(initialNotifications);
        const [friends, setFriends] = useState([]);

        const handleAcceptFriendRequest = (notificationId, senderName) => {
          setFriends(prevFriends => {
            const isAlreadyFriend = prevFriends.some(friend => friend.name === senderName);
            if (isAlreadyFriend) {
              return prevFriends;
            }
            return [...prevFriends, {
              id: Date.now(),
              name: senderName,
              lastMessage: "New Friend",
              time: "now",
              unread: false,
              avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80"
            }];
          });

          setNotifications(prevNotifications =>
            prevNotifications.map(notif =>
              notif.id === notificationId ? { ...notif, unread: false } : notif
            )
          );
        };

        return (
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Bell className="h-8 w-8" />
              <h1 className="text-3xl font-light tracking-wider">Notifications</h1>
            </div>

            <div className="space-y-4">
              {notifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border border-zinc-800 transition-all duration-700 ${
                      notification.unread ? 'bg-zinc-900/50' : 'bg-transparent'
                    }`}
                    style={{
                      borderColor: notification.unread && activeColor
                        ? `rgba(${activeColor}, 0.2)`
                        : undefined,
                      backgroundColor: notification.unread && activeColor
                        ? `rgba(${activeColor}, 0.02)`
                        : undefined
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="p-2 rounded-lg"
                        style={{
                          backgroundColor: activeColor
                            ? `rgba(${activeColor}, 0.1)`
                            : 'rgba(255, 255, 255, 0.05)'
                        }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{notification.message}</p>
                        <span className="text-xs text-zinc-400">{notification.time}</span>
                      </div>
                      {notification.type === 'friendRequest' && notification.unread && (
                        <button
                          onClick={() => handleAcceptFriendRequest(notification.id, notification.sender)}
                          className="text-white bg-green-500 hover:bg-green-600 rounded-lg p-2 transition-colors duration-700"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      )}
                      {notification.unread && notification.type !== 'friendRequest' && (
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: activeColor
                              ? `rgb(${activeColor})`
                              : 'rgb(255, 255, 255)'
                          }}
                        ></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

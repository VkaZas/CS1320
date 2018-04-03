# Chat Room

Updates for Realtime:

- Instant messages and member lists are now transferring using _socket.io_.
- Other functionalities remain to use AJAX.
- Nicknames in member list shares the same color as their appearance in chats.

----------------------------------------------------

All 12 requirements are satisfied.

Some features:
- There's a 'New Room' button on the top right corner to add new rooms which is identified with a 6-digit __uuid__.
- You can press enter to send out messages.
- Every user's nickname is colored with unique RGB in the chat.
- Every time when a request comes in, the server will check whether database tables exist, and will create one if not.
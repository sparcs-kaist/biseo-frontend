export function spawnNotification(title: string, body: string): void {
  new Notification(title, {
    body: body,
    icon: '/src/public/symbol.png',
  });
}

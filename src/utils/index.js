export function isAdmin(mail, admins) {
  for (let { email } of Object.values(admins)) if (mail === email) return true;
  return false;
}

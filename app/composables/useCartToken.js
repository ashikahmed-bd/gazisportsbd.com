export const useCartToken = () => {
  const token = useCookie("cart_token", {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
    default: () => crypto.randomUUID(),
  });

  return token;
};

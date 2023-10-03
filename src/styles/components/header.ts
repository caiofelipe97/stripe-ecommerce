import { styled } from "..";

export const HeaderContainer = styled("header", {
  display: "flex",
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",
  alignItems: "center",
  justifyContent: "space-between",
});

export const CartButton = styled("button", {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.75rem",
  backgroundColor: "$gray800",
  border: 0,
  borderRadius: 6,
  cursor: "pointer",
  transition: "background-color 0.2s ease",

  "&:hover": {
    backgroundColor: "$gray600",
  },
});

export const CartBadge = styled("span", {
  color: "$white",
  backgroundColor: "$green500",
  borderRadius: "50%",
  padding: "4px 8px",
  fontSize: "12px",
  position: "absolute",
  top: "-5px",
  right: "-5px",
});

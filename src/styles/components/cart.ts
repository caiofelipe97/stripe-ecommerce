import { styled } from "..";

export const CartContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "fixed",
  height: "calc(100vh - (2* 3rem))",
  backgroundColor: "$gray800",
  width: 300,
  top: 0,
  bottom: 0,
  right: "calc(-300px - (3rem * 2))",

  transition: "all 0.3s ease-in-out",
  padding: "3rem",

  gap: "2rem",

  "&.expanded": {
    right: 0,
  },
});

export const CardContent = styled("div", {
  flex: 5,
});

export const CloseButtonContainer = styled("div", {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  marginTop: "-1.5rem",
  marginRight: "-1.5rem",
});

export const CloseButton = styled("button", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 4,
  border: 0,
  background: "transparent",
  cursor: "pointer",
});

export const CartTitle = styled("strong", {
  fontSize: "$lg",
  color: "$gray100",
});

export const BuyListContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  marginTop: "1.5rem",
});

export const ProductContainer = styled("div", {
  display: "flex",
  gap: "1.25rem",
  maxHeight: 90,
});

export const ProductImageContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,

  img: {
    objectFit: "cover",
  },
});

export const ProductInfoContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  div: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    p: {
      fontSize: "$md",
    },
    strong: {
      fontSize: "$md",
    },
  },

  button: {
    display: "flex",
    padding: 4,
    border: 0,
    width: "fit-content",
    color: "$green500",
    background: "transparent",
    cursor: "pointer",
    marginLeft: -4,
    fontSize: "$sm",

    transition: "color 0.2s ease-in-out",

    "&:hover": {
      color: "$green300",
    },
  },
});

export const SummaryContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  button: {
    marginTop: "auto",
    padding: "1.25rem",
    color: "$white",
    background: "$green500",
    borderRadius: 8,
    border: 0,
    fontSize: "$md",
    fontWeight: "bold",

    cursor: "pointer",
    transition: "background-color 0.2s ease",

    "&:not(:disabled):hover": {
      backgroundColor: "$green300",
    },

    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },
  },
});

export const Row = styled("div", {
  display: "flex",

  justifyContent: "space-between",
  alignItems: "center",

  height: "auto",

  span: {
    color: "$grey100",
    "&:first-child": {
      fontSize: "$sm",
    },
    "&:last-child": {
      fontSize: "$md",
    },
  },

  strong: {
    color: "$grey100",
    marginTop: 7,
    "&:first-child": {
      fontSize: "$md",
    },
    "&:last-child": {
      fontSize: "$lg",
    },
  },
});

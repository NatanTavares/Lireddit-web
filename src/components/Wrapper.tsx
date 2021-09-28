import { Box } from "@chakra-ui/react";

type Props = {
  variant?: "small" | "regular";
};

export const Wrapper: React.FC<Props> = ({ children, variant = "regular" }) => {
  return (
    <Box as="main" w="100%" minH="100vh">
      <Box
        pt="8"
        mx="auto"
        maxWidth={variant === "regular" ? "800px" : "400px"}
        w="100%"
      >
        {children}
      </Box>
    </Box>
  );
};

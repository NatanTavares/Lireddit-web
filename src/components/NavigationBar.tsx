import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import NextLink from "next/link";

type Props = {};

export const NavigationBar: React.FC<Props> = () => {
  return (
    <>
      <Breadcrumb
        fontSize="md"
        separator="|"
        bg="gray.700"
        p={4}
        textAlign="end"
      >
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <NextLink href="/login">
            <BreadcrumbLink>Login</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <NextLink href="/register">
            <BreadcrumbLink>Register</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </>
  );
};

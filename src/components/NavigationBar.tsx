import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import NextLink from "next/link";
import {
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";

export const NavigationBar: React.FC = () => {
  const [{ data }] = useMeQuery();
  const [{ fetching: logoutFeting }, logout] = useLogoutMutation();

  return (
    <>
      {!!data?.me?.user ? (
        <Breadcrumb
          fontSize="md"
          separator="|"
          bg="gray.700"
          p={2}
          textAlign="end"
        >
          <BreadcrumbItem>
            <Button variant="ghost" size="sm">
              {data?.me?.user?.username}
            </Button>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Button
              colorScheme="teal"
              variant="ghost"
              size="sm"
              onClick={() => logout()}
              isLoading={logoutFeting}
            >
              Logout
            </Button>
          </BreadcrumbItem>
        </Breadcrumb>
      ) : (
        <Breadcrumb
          fontSize="md"
          separator="|"
          bg="gray.700"
          p={2}
          textAlign="end"
        >
          <BreadcrumbItem>
            <Button variant="ghost" size="sm">
              <BreadcrumbLink>Home</BreadcrumbLink>
            </Button>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <NextLink href="/login">
              <Button colorScheme="teal" variant="ghost" size="sm">
                Login
              </Button>
            </NextLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <NextLink href="/register">
              <Button colorScheme="teal" variant="ghost" size="sm">
                Register
              </Button>
            </NextLink>
          </BreadcrumbItem>
        </Breadcrumb>
      )}
    </>
  );
};

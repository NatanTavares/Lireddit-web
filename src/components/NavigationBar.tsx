import {
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from "@chakra-ui/react";
import { useMeQuery } from "../generated/graphql";
import NextLink from "next/link";

type Props = {};

export const NavigationBar: React.FC<Props> = () => {
  const [{ data }] = useMeQuery();

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
            {/* <Text>{data?.me?.user?.username}</Text> */}
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Button colorScheme="teal" variant="ghost" size="sm">
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

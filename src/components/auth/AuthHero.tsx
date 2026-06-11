import React from "react";
import {Badge, Box, Center, Flex, Heading, Stack, Text} from "@chakra-ui/react";
import {LuCircleCheck, LuLockKeyhole, LuSparkles} from "react-icons/lu";

export const AuthHero = React.memo(() => {
    return (
        <Box
            bg="#0a2540"
            color="white"
            display={{base: "none", lg: "block"}}
            flex="1"
            overflow="hidden"
            p="12"
            position="relative"
            _after={{
                bg: "linear-gradient(135deg, rgba(0,212,255,0.28), rgba(99,91,255,0.2))",
                borderRadius: "999px",
                bottom: "-120px",
                content: '""',
                h: "360px",
                position: "absolute",
                right: "-120px",
                w: "360px",
            }}
        >
            <Stack gap="10" h="full" justify="space-between" position="relative" zIndex="1">
                <Stack gap="7">
                    <Flex align="center" gap="3">
                        <Center bg="whiteAlpha.200" boxSize="11" rounded="2xl">
                            <LuCircleCheck size="24" />
                        </Center>
                        <Text fontWeight="bold" letterSpacing="0.12em" textTransform="uppercase">
                            Taskflow
                        </Text>
                    </Flex>
                    <Stack gap="5">
                        <Badge alignSelf="flex-start" bg="whiteAlpha.200" color="cyan.100" px="3" py="1" rounded="full">
                            <LuSparkles />
                            JWT demo workspace
                        </Badge>
                        <Heading fontSize="5xl" letterSpacing="-0.055em" lineHeight="1">
                            One clean place to ship every small task.
                        </Heading>
                        <Text color="whiteAlpha.800" fontSize="lg" maxW="md">
                            A focused demo app with secure sessions, fast task capture, and a polished Stripe-inspired control surface.
                        </Text>
                    </Stack>
                </Stack>
                <Flex bg="whiteAlpha.100" borderColor="whiteAlpha.200" borderWidth="1px" gap="4" p="5" rounded="2xl">
                    <Center bg="cyan.300" boxSize="10" color="#0a2540" rounded="xl">
                        <LuLockKeyhole />
                    </Center>
                    <Stack gap="1">
                        <Text fontWeight="semibold">JWT protected</Text>
                        <Text color="whiteAlpha.700" textStyle="sm">
                            Login, register, then manage your private task list.
                        </Text>
                    </Stack>
                </Flex>
            </Stack>
        </Box>
    );
});

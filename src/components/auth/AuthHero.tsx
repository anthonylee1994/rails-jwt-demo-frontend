import React from "react";
import {Badge, Box, Center, Flex, Heading, Stack, Text} from "@chakra-ui/react";
import {LuCircleCheck, LuLockKeyhole, LuSparkles} from "react-icons/lu";

export const AuthHero = React.memo(() => {
    return (
        <Box
            borderColor="rgba(255,255,255,0.07)"
            borderRightWidth="1px"
            color="white"
            display={{base: "none", lg: "block"}}
            flex="1"
            overflow="hidden"
            p="12"
            position="relative"
            bg="rgba(10,10,20,0.6)"
        >
            {/* Inner gradient mesh */}
            <Box
                filter="blur(60px)"
                h="400px"
                left="-100px"
                pointerEvents="none"
                position="absolute"
                top="-100px"
                w="400px"
                zIndex="0"
                bg="radial-gradient(circle, rgba(124,111,255,0.3) 0%, transparent 70%)"
            />
            <Box
                bottom="-80px"
                filter="blur(60px)"
                h="300px"
                pointerEvents="none"
                position="absolute"
                right="-80px"
                w="300px"
                zIndex="0"
                bg="radial-gradient(circle, rgba(0,212,255,0.2) 0%, transparent 70%)"
            />

            <Stack gap="10" h="full" justify="space-between" position="relative" zIndex="1">
                <Stack gap="7">
                    <Flex align="center" gap="3">
                        <Center
                            bg="rgba(124,111,255,0.2)"
                            borderColor="rgba(124,111,255,0.35)"
                            borderWidth="1px"
                            boxSize="11"
                            rounded="2xl"
                        >
                            <LuCircleCheck size="22" color="#a78bfa" />
                        </Center>
                        <Text
                            color="rgba(200,195,255,0.85)"
                            fontWeight="bold"
                            letterSpacing="0.14em"
                            textTransform="uppercase"
                            fontSize="sm"
                        >
                            Taskflow
                        </Text>
                    </Flex>
                    <Stack gap="5">
                        <Badge
                            alignSelf="flex-start"
                            bg="rgba(124,111,255,0.15)"
                            borderColor="rgba(124,111,255,0.3)"
                            borderWidth="1px"
                            color="rgba(167,139,250,0.9)"
                            px="3"
                            py="1"
                            rounded="full"
                        >
                            <LuSparkles />
                            JWT demo workspace
                        </Badge>
                        <Heading
                            color="rgba(240,238,255,0.96)"
                            fontSize="5xl"
                            letterSpacing="-0.055em"
                            lineHeight="1"
                        >
                            One clean place to ship every small task.
                        </Heading>
                        <Text color="rgba(200,200,220,0.65)" fontSize="lg" maxW="md" lineHeight="1.7">
                            A focused demo app with secure sessions, fast task capture, and a polished dark-mode control surface.
                        </Text>
                    </Stack>
                </Stack>

                <Flex
                    backdropFilter="blur(12px)"
                    bg="rgba(255,255,255,0.04)"
                    borderColor="rgba(255,255,255,0.09)"
                    borderWidth="1px"
                    boxShadow="inset 0 1px 0 rgba(255,255,255,0.06)"
                    gap="4"
                    p="5"
                    rounded="2xl"
                >
                    <Center
                        bg="rgba(0,212,255,0.15)"
                        borderColor="rgba(0,212,255,0.3)"
                        borderWidth="1px"
                        boxSize="10"
                        rounded="xl"
                    >
                        <LuLockKeyhole color="#00d4ff" />
                    </Center>
                    <Stack gap="1">
                        <Text color="rgba(240,240,255,0.92)" fontWeight="semibold" fontSize="sm">
                            JWT protected
                        </Text>
                        <Text color="rgba(200,200,220,0.55)" textStyle="sm">
                            Login, register, then manage your private task list.
                        </Text>
                    </Stack>
                </Flex>
            </Stack>
        </Box>
    );
});

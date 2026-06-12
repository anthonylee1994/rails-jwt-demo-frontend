import React from "react";
import {Button, Center, Flex, Heading, Stack, Text} from "@chakra-ui/react";
import {LuCircleCheck, LuLogOut} from "react-icons/lu";

interface Props {
    onLogout(): void;
}

export const TodoHeader = React.memo<Props>(({onLogout}) => {
    return (
        <Flex align={{base: "stretch", md: "flex-start"}} direction={{base: "column", md: "row"}} gap={{base: "5", md: "8"}} justify="space-between" mb={{base: "8", md: "12"}}>
            <Stack gap={{base: "5", md: "4"}} maxW="3xl" mt={{base: 0, md: 10}}>
                <Flex align="center" gap="3" justify="space-between">
                    <Flex align="center" gap="3" minW="0">
                        <Center
                            bg="rgba(124,111,255,0.18)"
                            borderColor="rgba(124,111,255,0.3)"
                            borderWidth="1px"
                            boxSize={{base: "11", md: "12"}}
                            boxShadow="0 8px 24px rgba(124,111,255,0.2)"
                            flexShrink="0"
                            rounded="2xl"
                        >
                            <LuCircleCheck size="24" color="#a78bfa" />
                        </Center>
                        <Heading
                            color="rgba(240,238,255,0.97)"
                            fontSize={{base: "3xl", md: "5xl"}}
                            letterSpacing="-0.06em"
                            lineHeight="1"
                        >
                            My Tasks
                        </Heading>
                    </Flex>
                    <Button
                        aria-label="Logout"
                        alignSelf="center"
                        backdropFilter="blur(12px)"
                        bg="rgba(255,255,255,0.06)"
                        borderColor="rgba(255,255,255,0.1)"
                        borderWidth="1px"
                        boxSize="13"
                        color="rgba(200,200,220,0.7)"
                        display={{base: "inline-flex", md: "none"}}
                        flexShrink="0"
                        minW="13"
                        p="0"
                        rounded="full"
                        variant="outline"
                        onClick={onLogout}
                        _hover={{bg: "rgba(255,255,255,0.1)", color: "rgba(240,238,255,0.9)"}}
                    >
                        <LuLogOut size="18" />
                    </Button>
                </Flex>
                <Text
                    alignSelf={{base: "center", md: "stretch"}}
                    color="rgba(200,200,220,0.6)"
                    fontSize="lg"
                    lineHeight={{base: "1.55", md: "1.7"}}
                    maxW={{base: "34rem", md: "2xl"}}
                    textAlign={{base: "center", md: "left"}}
                >
                    Capture tasks quickly, keep progress visible, and stay focused on the next action.
                </Text>
            </Stack>
            <Button
                alignSelf="center"
                backdropFilter="blur(12px)"
                bg="rgba(255,255,255,0.05)"
                borderColor="rgba(255,255,255,0.1)"
                borderWidth="1px"
                color="rgba(200,200,220,0.7)"
                display={{base: "none", md: "inline-flex"}}
                rounded="full"
                variant="outline"
                onClick={onLogout}
                _hover={{bg: "rgba(255,255,255,0.09)", color: "rgba(240,238,255,0.9)"}}
            >
                <LuLogOut />
                Logout
            </Button>
        </Flex>
    );
});

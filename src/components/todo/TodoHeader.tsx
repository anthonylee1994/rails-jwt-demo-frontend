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
                        <Center bg="whiteAlpha.200" boxSize={{base: "11", md: "12"}} color="white" flexShrink="0" rounded="2xl" shadow="0 16px 32px rgba(10,37,64,0.16)">
                            <LuCircleCheck size="24" />
                        </Center>
                        <Heading color="white" fontSize={{base: "3xl", md: "5xl"}} letterSpacing="-0.06em" lineHeight="1">
                            My Tasks
                        </Heading>
                    </Flex>
                    <Button
                        aria-label="Logout"
                        alignSelf="center"
                        bg="whiteAlpha.950"
                        boxSize="13"
                        color="#425466"
                        display={{base: "inline-flex", md: "none"}}
                        flexShrink="0"
                        minW="13"
                        p="0"
                        rounded="full"
                        shadow="0 12px 30px rgba(10,37,64,0.16)"
                        variant="outline"
                        onClick={onLogout}
                    >
                        <LuLogOut size="22" />
                    </Button>
                </Flex>
                <Text
                    alignSelf={{base: "center", md: "stretch"}}
                    color="white"
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
                bg="whiteAlpha.950"
                color="#425466"
                display={{base: "none", md: "inline-flex"}}
                rounded="full"
                shadow="0 12px 30px rgba(10,37,64,0.16)"
                variant="outline"
                onClick={onLogout}
            >
                <LuLogOut />
                Logout
            </Button>
        </Flex>
    );
});

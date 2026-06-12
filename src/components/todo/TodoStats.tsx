import React from "react";
import {Box, Card, Flex, Heading, SimpleGrid, Text} from "@chakra-ui/react";
import {LuCircleCheck, LuClipboardList, LuTarget} from "react-icons/lu";

interface Props {
    completedCount: number;
    completedPercent: number;
    totalCount: number;
}

export const TodoStats = React.memo<Props>(({completedCount, completedPercent, totalCount}) => {
    return (
        <SimpleGrid columns={{base: 1, md: 3}} gap="4" mb="4">
            <Card.Root
                backdropFilter="blur(16px)"
                bg="rgba(255,255,255,0.04)"
                borderColor="rgba(255,255,255,0.08)"
                borderWidth="1px"
                boxShadow="0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)"
                rounded="2xl"
            >
                <Card.Body gap="2" px="5" py="4">
                    <Flex align="center" justify="space-between">
                        <Text color="rgba(180,178,210,0.6)" fontWeight="semibold" textStyle="sm">
                            Total tasks
                        </Text>
                        <LuClipboardList color="#a78bfa" size="16" />
                    </Flex>
                    <Heading color="rgba(240,238,255,0.95)" fontSize="2xl" letterSpacing="-0.04em">
                        {totalCount}
                    </Heading>
                </Card.Body>
            </Card.Root>

            <Card.Root
                backdropFilter="blur(16px)"
                bg="rgba(255,255,255,0.04)"
                borderColor="rgba(255,255,255,0.08)"
                borderWidth="1px"
                boxShadow="0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)"
                rounded="2xl"
            >
                <Card.Body gap="2" px="5" py="4">
                    <Flex align="center" justify="space-between">
                        <Text color="rgba(180,178,210,0.6)" fontWeight="semibold" textStyle="sm">
                            Completed
                        </Text>
                        <LuCircleCheck color="#00e5a0" size="16" />
                    </Flex>
                    <Heading color="rgba(240,238,255,0.95)" fontSize="2xl" letterSpacing="-0.04em">
                        {completedCount}
                    </Heading>
                </Card.Body>
            </Card.Root>

            <Card.Root
                backdropFilter="blur(16px)"
                bg="rgba(124,111,255,0.12)"
                borderColor="rgba(124,111,255,0.25)"
                borderWidth="1px"
                boxShadow="0 8px 40px rgba(124,111,255,0.2), inset 0 1px 0 rgba(255,255,255,0.07)"
                color="white"
                overflow="hidden"
                rounded="2xl"
            >
                <Card.Body gap="2" px="5" py="4" position="relative">
                    <Flex align="center" justify="space-between">
                        <Text color="rgba(200,195,255,0.65)" fontWeight="semibold" textStyle="sm">
                            Progress
                        </Text>
                        <LuTarget color="#00d4ff" size="16" />
                    </Flex>
                    <Heading color="rgba(240,238,255,0.97)" fontSize="2xl" letterSpacing="-0.04em">
                        {Math.round(completedPercent)}%
                    </Heading>
                    {/* Decorative glow orb */}
                    <Box
                        bg="radial-gradient(circle, rgba(0,212,255,0.35) 0%, transparent 70%)"
                        borderRadius="999px"
                        bottom="-48px"
                        h="120px"
                        pointerEvents="none"
                        position="absolute"
                        right="-42px"
                        w="120px"
                    />
                </Card.Body>
            </Card.Root>
        </SimpleGrid>
    );
});

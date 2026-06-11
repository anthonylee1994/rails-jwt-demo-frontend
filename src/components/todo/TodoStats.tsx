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
            <Card.Root borderColor="blackAlpha.100" rounded="2xl" shadow="sm">
                <Card.Body gap="2" px="5" py="4">
                    <Flex align="center" justify="space-between">
                        <Text color="gray.500" fontWeight="semibold" textStyle="sm">
                            Total tasks
                        </Text>
                        <LuClipboardList color="#635bff" />
                    </Flex>
                    <Heading color="#0a2540" fontSize="2xl" letterSpacing="-0.04em">
                        {totalCount}
                    </Heading>
                </Card.Body>
            </Card.Root>
            <Card.Root borderColor="blackAlpha.100" rounded="2xl" shadow="sm">
                <Card.Body gap="2" px="5" py="4">
                    <Flex align="center" justify="space-between">
                        <Text color="gray.500" fontWeight="semibold" textStyle="sm">
                            Completed
                        </Text>
                        <LuCircleCheck color="#00a88f" />
                    </Flex>
                    <Heading color="#0a2540" fontSize="2xl" letterSpacing="-0.04em">
                        {completedCount}
                    </Heading>
                </Card.Body>
            </Card.Root>
            <Card.Root bg="#0a2540" borderColor="transparent" color="white" overflow="hidden" rounded="2xl" shadow="0 20px 50px rgba(10,37,64,0.22)">
                <Card.Body gap="2" px="5" py="4" position="relative">
                    <Flex align="center" justify="space-between">
                        <Text color="whiteAlpha.700" fontWeight="semibold" textStyle="sm">
                            Progress
                        </Text>
                        <LuTarget color="#00d4ff" />
                    </Flex>
                    <Heading fontSize="2xl" letterSpacing="-0.04em">
                        {Math.round(completedPercent)}%
                    </Heading>
                    <Box bg="cyan.300" borderRadius="999px" bottom="-48px" h="120px" opacity="0.2" position="absolute" right="-42px" w="120px" />
                </Card.Body>
            </Card.Root>
        </SimpleGrid>
    );
});

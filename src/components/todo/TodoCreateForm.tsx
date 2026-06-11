import React from "react";
import {Button, Group, Input} from "@chakra-ui/react";
import {LuPlus} from "react-icons/lu";

interface Props {
    newTaskName: string;
    onChange(name: string): void;
    onSubmit(event: React.FormEvent<HTMLFormElement>): void;
}

export const TodoCreateForm = React.memo<Props>(({newTaskName, onChange, onSubmit}) => {
    return (
        <form onSubmit={onSubmit}>
            <Group attached w="full">
                <Input
                    aria-label="New task name"
                    bg="white"
                    borderColor="blackAlpha.200"
                    flex="1"
                    minW="0"
                    placeholder="What needs to be done?"
                    roundedStart="xl"
                    size="lg"
                    value={newTaskName}
                    onChange={event => onChange(event.target.value)}
                    _focusVisible={{borderColor: "#635bff", boxShadow: "0 0 0 1px #635bff", zIndex: 1}}
                />
                <Button aria-label="Add task" bg="#635bff" boxSize="12" color="white" disabled={!newTaskName.trim()} flexShrink="0" minW="12" p="0" rounded="xl" type="submit" _hover={{bg: "#4f46e5"}}>
                    <LuPlus />
                </Button>
            </Group>
        </form>
    );
});

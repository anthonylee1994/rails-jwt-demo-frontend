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
                    bg="rgba(255,255,255,0.05)"
                    borderColor="rgba(255,255,255,0.1)"
                    color="rgba(240,238,255,0.95)"
                    flex="1"
                    minW="0"
                    placeholder="What needs to be done?"
                    roundedStart="xl"
                    size="lg"
                    value={newTaskName}
                    onChange={event => onChange(event.target.value)}
                    _placeholder={{color: "rgba(180,178,210,0.38)"}}
                    _focusVisible={{
                        borderColor: "rgba(124,111,255,0.6)",
                        boxShadow: "0 0 0 3px rgba(124,111,255,0.15)",
                        bg: "rgba(255,255,255,0.07)",
                        zIndex: 1,
                    }}
                />
                <Button
                    aria-label="Add task"
                    bg="rgba(124,111,255,0.85)"
                    borderColor="rgba(124,111,255,0.3)"
                    borderWidth="1px"
                    boxSize="12"
                    color="white"
                    disabled={!newTaskName.trim()}
                    flexShrink="0"
                    minW="12"
                    p="0"
                    rounded="xl"
                    type="submit"
                    _hover={{bg: "rgba(124,111,255,1)", boxShadow: "0 8px 24px rgba(124,111,255,0.35)"}}
                    _disabled={{opacity: 0.4}}
                >
                    <LuPlus />
                </Button>
            </Group>
        </form>
    );
});

import {
  Box,
  BoxProps,
  Button,
  createListCollection,
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerPositioner,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
  Flex,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Field } from "./ui/field";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "./ui/select";

export interface LeavesForDate {
  [date: string]: Leave[];
}

export interface Leave {
  id: string;
  employee: string;
  employeeName: string;
  type: string;
  description: string;
}

export interface DateBoxProps {
  date: number;
  leaves: LeavesForDate;
}

const leaveThemes: Record<string, BoxProps> = {
  Vacation: {
    bg: "green.600",
    color: "white",
  },
  Sick: {
    bg: "red.300",
    color: "white",
  },
  default: {
    bg: "gray.200",
    color: "black",
  },
};

const employees = createListCollection({
  items: [
    { label: "John Doe", value: "John Doe" },
    { label: "Jane Smith", value: "Jane Smith" },
    { label: "David Nimoy", value: "David Nimoy" },
    { label: "Charles Darwin", value: "Charles Darwin" },
  ],
});

const leaveTypes = createListCollection({
  items: [
    { label: "Vacation", value: "Vacation" },
    { label: "Sick Leave", value: "Sick Leave" },
    { label: "Annual Leave", value: "Annual Leave" },
    { label: "Child Care Leave", value: "Child Care Leave" },
  ],
});

export const DateBox = ({ date, leaves }: DateBoxProps) => {
  const [isSingleDay, setIsSingleDay] = useState(false);

  return (
    <DrawerRoot placement="end">
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Flex
          border="1px solid"
          borderColor="gray.200"
          p={2}
          minH="50px"
          direction="column"
          gap={1}
          _hover={{ backgroundColor: "gray.200", color: "blackAlpha.600" }}
        >
          <Text fontWeight="bold">{date}</Text>
          <VStack spaceY={1}>
            {leaves[date] &&
              leaves[date].map((leave, index) => {
                const themeProps =
                  leaveThemes[leave.type] ?? leaveThemes.default;
                return (
                  <Box
                    key={index}
                    px={2}
                    py={1}
                    fontSize="sm"
                    textAlign="center"
                    w="full"
                    {...themeProps}
                  >
                    {leave.description}
                  </Box>
                );
              })}
          </VStack>
        </Flex>
      </DrawerTrigger>
      <DrawerPositioner>
        <DrawerContent
          colorScheme="light dark"
          color="rgba(255, 255, 255, 0.87)"
          backgroundColor="#242424"
        >
          <DrawerHeader>
            <DrawerTitle>Add Leave</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <form>
              <VStack spaceY={4}>
                <Field
                  required
                  label="Employee"
                >
                  <SelectRoot
                    collection={employees}
                    size="md"
                  >
                    <SelectTrigger>
                      <SelectValueText placeholder="Select employee.." />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.items.map((employee) => (
                        <SelectItem
                          item={employee}
                          key={employee.value}
                        >
                          {employee.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                </Field>
                <Field
                  required
                  label="Leave Type"
                >
                  <SelectRoot
                    collection={leaveTypes}
                    size="md"
                  >
                    <SelectTrigger>
                      <SelectValueText placeholder="Select leave type.." />
                    </SelectTrigger>
                    <SelectContent>
                      {leaveTypes.items.map((type) => (
                        <SelectItem
                          item={type}
                          key={type.value}
                        >
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                </Field>
                <Checkbox
                  checked={isSingleDay}
                  onCheckedChange={(e) => setIsSingleDay(!!e.checked)}
                >
                  Single Day
                </Checkbox>
                <Field
                  required
                  label={isSingleDay ? "Date" : "From"}
                >
                  <Input type="date" />
                </Field>
                {!isSingleDay && (
                  <Field
                    required
                    label="To"
                  >
                    <Input type="date" />
                  </Field>
                )}
              </VStack>
            </form>
          </DrawerBody>
          <DrawerFooter>
            <DrawerActionTrigger asChild>
              <Button>Cancel</Button>
            </DrawerActionTrigger>
            <Button>Save</Button>
          </DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerPositioner>
    </DrawerRoot>
  );
};

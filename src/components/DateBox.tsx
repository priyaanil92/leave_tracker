import { Box, BoxProps, Text, VStack } from "@chakra-ui/react";

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

export const DateBox = ({ date, leaves }: DateBoxProps) => {
  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      p={2}
      w="100%"
      minH="50px"
      display="flex"
      flexDirection="column"
    >
      <Text fontWeight="bold">{date}</Text>

      <VStack spaceY={1}>
        {leaves[date] &&
          leaves[date].map((leave, index) => {
            const themeProps = leaveThemes[leave.type] ?? leaveThemes.default;
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
    </Box>
  );
};

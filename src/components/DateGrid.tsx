import { SimpleGrid, Box, Text } from "@chakra-ui/react";
import { DateBox } from "./DateBox";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
} from "date-fns";

export interface DateGridProps {
  currentMonth: Date;
}

export const DateGrid = ({ currentMonth }: DateGridProps) => {
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  /**
   * getDay returns an integer between 0 and 6. 0 - Sunday, 6 - Saturday
   */

  /*firstDayOfWeek indicates how many placeholder boxes we need at the beginning to offset the actual days.
  If first day of the month is Sunday, no offset placeholders needed, if first day is Wednesday, 3 offset placeholders needed etc.*/
  const firstDayOfWeek = getDay(startOfMonth(currentMonth));

  /*endPlaceholders indicates how many placeholder boxes we need at the beginning to offset the actual days.
  If last day of the month is Saturday, no (6-6) offset placeholders needed, if last day is Wednesday, 3 (6-3) offset placeholders needed etc.*/
  const lastDayOfWeek = getDay(endOfMonth(currentMonth));
  const endPlaceholders = 6 - lastDayOfWeek;

  // Sample static leaves for demonstration
  const sampleLeaves = {
    20: [
      {
        id: "1",
        employee: "E001",
        employeeName: "John Doe",
        type: "Vacation",
        description: "John Doe on Vacation Day",
      },
      {
        id: "2",
        employee: "E002",
        employeeName: "Jane Smith",
        type: "Sick",
        description: "Jane Smith on Sick Leave",
      },
    ],
    5: [
      {
        id: "2",
        employee: "E002",
        employeeName: "Jane Smith",
        type: "Sick",
        description: "Jane Smith on Sick Leave",
      },
    ],
    6: [
      {
        id: "2",
        employee: "E002",
        employeeName: "Jane Smith",
        type: "Sick",
        description: "Jane Smith on Sick Leave",
      },
    ],
  };

  return (
    <SimpleGrid columns={7}>
      {/* Weekday headers */}
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <Box
          border="1px solid"
          borderColor="gray.200"
          p={2}
          w="100%"
          minH="50px"
          display="flex"
          flexDirection="column"
          textAlign="center"
        >
          <Text fontWeight="bold">{day}</Text>
        </Box>
      ))}

      {/* Placeholder boxes for offsetting the first day */}
      {Array.from({ length: firstDayOfWeek }).map((_, index) => (
        <Box
          key={`placeholder-${index}`}
          border="1px solid"
          borderColor="gray.200"
          p={2}
          w="100%"
          minH="50px"
        />
      ))}

      {/* Days of the month */}
      {daysInMonth.map((date) => (
        <DateBox
          key={format(date, "d")}
          date={parseInt(format(date, "d"))}
          leaves={sampleLeaves}
        />
      ))}

      {/* Placeholder boxes for the remaining days of the last week */}
      {Array.from({ length: endPlaceholders }).map((_, index) => (
        <Box
          key={`end-placeholder-${index}`}
          border="1px solid"
          borderColor="gray.200"
          p={2}
          w="100%"
          minH="50px"
        />
      ))}
    </SimpleGrid>
  );
};

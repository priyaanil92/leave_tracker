import { Flex, IconButton, Text } from "@chakra-ui/react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { DateGrid } from "./DateGrid";
import { addMonths, format } from "date-fns";
import { useState } from "react";

export const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const formattedMonth = format(currentMonth, "MMMM, yyyy");

  const handlePrevMonthClick = () => {
    setCurrentMonth((currentMonth) => addMonths(currentMonth, -1));
  };

  const handleNextMonthClick = () => {
    setCurrentMonth((currentMonth) => addMonths(currentMonth, 1));
  };

  return (
    <Flex
      direction="column"
      gap="1rem"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton
          aria-label="Previous Month"
          onClick={handlePrevMonthClick}
        >
          <BsArrowLeft />
        </IconButton>
        <Text fontWeight="extrabold">{formattedMonth}</Text>
        <IconButton
          aria-label="Next Month"
          onClick={handleNextMonthClick}
        >
          <BsArrowRight />
        </IconButton>
      </Flex>
      <DateGrid currentMonth={currentMonth} />
    </Flex>
  );
};

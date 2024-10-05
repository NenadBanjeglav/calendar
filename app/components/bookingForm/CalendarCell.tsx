import React, { useRef } from "react";
import { mergeProps, useCalendarCell, useFocusRing } from "react-aria";
import { CalendarState } from "react-stately";
import {
  CalendarDate,
  getLocalTimeZone,
  isSameMonth,
  isToday,
} from "@internationalized/date";
import { cn } from "@/lib/utils";

const CalendarCell = ({
  state,
  date,
  currentMonth,
  isUnavailable,
}: {
  state: CalendarState;
  date: CalendarDate;
  currentMonth: CalendarDate;
  isUnavailable?: boolean;
}) => {
  const ref = useRef(null);
  const { cellProps, buttonProps, isSelected, isDisabled, formattedDate } =
    useCalendarCell({ date }, state, ref);

  const { focusProps, isFocusVisible } = useFocusRing();
  const isDateToday = isToday(date, getLocalTimeZone());
  const isOutsideOfMonth = !isSameMonth(currentMonth, date);

  const finalisDisabled = isDisabled || isUnavailable;

  return (
    <td
      {...cellProps}
      className={`relative p-0.5 ${isFocusVisible ? "z-10" : "z-0"}`}
    >
      <div
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        hidden={isOutsideOfMonth}
        className="group size-10 rounded-md outline-none sm:size-12"
      >
        <div
          className={cn(
            "size-full rounded-sm flex items-center justify-center text-sm font-semibold",

            finalisDisabled ? "text-muted-foreground cursor-not-allowed" : "",

            isSelected ? "bg-primary text-white" : "",

            !isSelected && !finalisDisabled ? "bg-secondary" : ""
          )}
        >
          {formattedDate}
          {isDateToday && (
            <div
              className={cn(
                "absolute bottom-3 left-1/2 size-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary",
                isSelected && "bg-white"
              )}
            />
          )}
        </div>
      </div>
    </td>
  );
};

export default CalendarCell;

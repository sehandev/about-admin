'use client'

import { CalendarIcon } from '@radix-ui/react-icons'
import { addDays, format } from 'date-fns'
import { SetStateAction, Dispatch, ReactNode } from 'react'

import { Button } from '@components/ui/button'
import { Calendar } from '@components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select'
import { cn } from '@libs/utils'

interface DatePickerType {
  date: Date | undefined
  setDate: Dispatch<SetStateAction<Date | undefined>>
  placeholder: string
}
export function DatePicker({ date, setDate, placeholder }: DatePickerType): ReactNode {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('w-fit justify-start text-left font-normal', !date && 'text-muted-foreground')}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'yyyy-MM-dd') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex w-auto flex-col space-y-2 p-2">
        <Select onValueChange={(value) => setDate(addDays(new Date(), parseInt(value)))}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="-7">일주일 전</SelectItem>
            <SelectItem value="-30">30일 전</SelectItem>
            <SelectItem value="-365">1년 전</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
      </PopoverContent>
    </Popover>
  )
}

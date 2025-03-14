// Компонент для выбора голосов ElevenLabs
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

// Список голосов ElevenLabs
const voices = [
  "Aria",
  "Brian",
  "Daniel",
  "Dorothy",
  "Emma",
  "Ethan",
  "Freya",
  "Gigi",
  "Grace",
  "Jackson",
  "Lily",
  "Matilda",
  "Matthew",
  "Michael",
  "Olivia",
  "Rachel",
  "Ryan",
  "Sam",
  "Serena",
  "Thomas",
];

type VoiceSelectorProps = {
  value: string;
  onValueChange: (value: string) => void;
} & ButtonProps;

export function VoiceSelector({
  value,
  onValueChange,
  className,
  ...props
}: VoiceSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          {...props}
          className={cn("max-w-fit justify-between", className)}
          role="combobox"
          aria-expanded={open}
        >
          {value ? voices.find((voice) => voice === value) : "Выбрать голос..."}
          <ChevronsUpDownIcon className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0" align="start">
        <Command>
          <CommandInput placeholder="Поиск голосов..." className="h-9" />
          <CommandList className="overflow-y-scroll">
            <CommandEmpty>Голос не найден</CommandEmpty>
            <CommandGroup>
              {voices.map((voice) => (
                <CommandItem
                  key={voice}
                  value={voice}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue);
                    setOpen(false);
                  }}
                >
                  {voice}
                  <CheckIcon
                    className={cn(
                      "ml-auto",
                      value === voice ? "visible" : "invisible",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

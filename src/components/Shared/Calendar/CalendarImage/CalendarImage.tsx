import React from 'react';

interface ICalendarIconProps {
  width: string;
  height: string;
}

const CalendarIcon: React.FC<ICalendarIconProps> = ({ width, height }) => {
  return (
    <svg
      viewBox="0 0 20 20"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.475 2.067h-1.312v-.321a.586.586 0 1 0-1.171 0v.32h-1.617v-.32a.586.586 0 0 0-1.172 0v.32h-1.617v-.32a.586.586 0 1 0-1.172 0v.32H7.797v-.32a.586.586 0 0 0-1.172 0v.32H5.008v-.32a.586.586 0 0 0-1.171 0v.32H2.525A2.527 2.527 0 0 0 0 4.592v11.724a2.527 2.527 0 0 0 2.525 2.525h14.95A2.527 2.527 0 0 0 20 16.316V4.59a2.527 2.527 0 0 0-2.525-2.524Zm1.353 14.248c0 .746-.607 1.353-1.353 1.353H2.525a1.354 1.354 0 0 1-1.353-1.352V6.732h17.656v9.584Zm0-10.755H1.172v-.969c0-.745.607-1.352 1.353-1.352h1.312v.226a.586.586 0 0 0 1.171 0V3.24h1.617v.226a.586.586 0 0 0 1.172 0V3.24h1.617v.226a.586.586 0 0 0 1.172 0V3.24h1.617v.226a.586.586 0 0 0 1.172 0V3.24h1.617v.226a.586.586 0 1 0 1.171 0V3.24h1.312c.746 0 1.353.607 1.353 1.352v.97Z"
        fill="#52555F"
      />
      <path
        d="M6.532 7.982H4.22a.586.586 0 0 0-.586.586v2.392c0 .323.262.586.586.586h2.312a.586.586 0 0 0 .586-.586V8.568a.586.586 0 0 0-.586-.586Zm-.586 2.392h-1.14v-1.22h1.14v1.22ZM11.156 7.982H8.844a.586.586 0 0 0-.586.586v2.392c0 .323.262.586.586.586h2.312a.586.586 0 0 0 .586-.586V8.568a.586.586 0 0 0-.586-.586Zm-.586 2.392H9.43v-1.22h1.14v1.22ZM15.78 7.982h-2.312a.586.586 0 0 0-.586.586v2.392c0 .323.262.586.586.586h2.312a.586.586 0 0 0 .586-.586V8.568a.586.586 0 0 0-.586-.586Zm-.586 2.392h-1.14v-1.22h1.14v1.22ZM6.532 12.526H4.22a.586.586 0 0 0-.586.586v2.392c0 .323.262.586.586.586h2.312a.586.586 0 0 0 .586-.586v-2.392a.586.586 0 0 0-.586-.586Zm-.586 2.392h-1.14v-1.22h1.14v1.22ZM11.156 12.526H8.844a.586.586 0 0 0-.586.586v2.392c0 .323.262.586.586.586h2.312a.586.586 0 0 0 .586-.586v-2.392a.586.586 0 0 0-.586-.586Zm-.586 2.392H9.43v-1.22h1.14v1.22ZM15.78 12.526h-2.312a.586.586 0 0 0-.586.586v2.392c0 .323.262.586.586.586h2.312a.586.586 0 0 0 .586-.586v-2.392a.586.586 0 0 0-.586-.586Zm-.586 2.392h-1.14v-1.22h1.14v1.22Z"
        fill="#52555F"
      />
    </svg>
  );
};

export default CalendarIcon;

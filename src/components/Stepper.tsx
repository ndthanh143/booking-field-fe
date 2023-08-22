import { Stepper as StepperMui, StepperProps as MuiStepperProps } from '@mui/material';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

export interface StepperProps extends MuiStepperProps {
  steps: string[];
  activeStep: number;
}

export const Stepper = ({ steps, activeStep, ...props }: StepperProps) => {
  return (
    <StepperMui activeStep={activeStep} {...props}>
      {steps.map((label, _) => {
        const stepProps: { completed?: boolean } = {};
        return (
          <Step key={label} {...stepProps}>
            <StepLabel>{label}</StepLabel>
          </Step>
        );
      })}
    </StepperMui>
  );
};

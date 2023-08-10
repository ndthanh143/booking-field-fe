import { Stepper as StepperMui, StepperProps } from '@mui/material';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

export interface IStepperProps extends StepperProps {
  steps: string[];
  activeStep: number;
}

export const Stepper = ({ steps, activeStep, ...props }: IStepperProps) => {
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

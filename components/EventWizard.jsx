import React from 'react';

function EventWizard({ activeStep }) {
  return (
    <div className="flex flex-wrap mb-5">
      {['Login ', 'Event Basics ', 'Event Category ', 'Event upload'].map(
        (step, index) => (
          <div
            key={step}
            className={`flex-1 text-center pb-2 border-b-2 ${
              index <= activeStep
                ? 'border-indigo-500 text-indigo-500'
                : 'border-gray-400 text-gray-400'
            }`}
          >
            {step}
          </div>
        )
      )}
    </div>
  );
}

export default EventWizard;

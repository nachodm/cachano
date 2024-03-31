import { Helmet } from 'react-helmet-async';

import { AddTrainingView } from 'src/sections/addTraining/view';

// ----------------------------------------------------------------------

export default function AddTrainingPage() {
  return (
    <>
      <Helmet>
        <title> Add Training </title>
      </Helmet>

      <AddTrainingView />
    </>
  );
}

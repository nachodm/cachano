import { supabase } from 'src/utils/supabase';

export async function loadExerciseTypes() {
  const { data, error } = await supabase.from('exercise_type').select('type');
  if (error) throw error;
  return data.map((obj) => obj.type);
}

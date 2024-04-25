import { supabase } from 'src/utils/supabase';

export async function loadExerciseTypes() {
  const { data, error } = await supabase.from('exercise_type').select('type');
  if (error) throw error;
  return data.map((obj) => obj.type);
}

export async function loadExercises() {
  const { data, error } = await supabase.from('exercise').select('id', 'exercise');
  if (error) throw error;
  return data;
}

export async function loadPersonalBest(id) {
  const { data, error } = await supabase
    .from('personal_best')
    .select('date', 'record', 'exercise')
    .eq('user_id', id);
  if (error) throw error;
  return data;
}

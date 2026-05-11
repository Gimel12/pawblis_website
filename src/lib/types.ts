export interface Client {
  id: string;
  created_at: string;
  user_id: string;
  consultation_date: string | null;
  owner_name: string;
  owner_email: string;
  dog_breed: string | null;
  dog_sex: string | null;
  dog_reproductive_status: string | null;
  consultation_reason: string | null;
  dog_weight: string | null;
  dog_birth_date: string | null;
  dog_adoption_date: string | null;
  adoption_status: string | null;
  dog_origin: string | null;
  consultation_motives: string | null;
  housing_type: string | null;
  interior_access: string | null;
  where_left_alone: string | null;
  how_stays_alone: string | null;
  walk_start_age: string | null;
  control_tools: string | null;
  food_type: string | null;
  food_brand: string | null;
  food_administration: string | null;
  treats: string | null;
  treats_when: string | null;
  is_glutton: boolean;
  food_removal_reaction: string | null;
  walks_number_duration: string | null;
  post_walk_routine: string | null;
  feeding_schedule: string | null;
  other_animals: OtherAnimal[] | null;
  socialization_family: string | null;
  socialization_strangers: string | null;
  socialization_known_dogs: string | null;
  socialization_unknown_dogs: string | null;
  elimination_behavior: string | null;
  sleep_location: string | null;
  uses_kongs: string | null;
  chases_bikes_kids: string | null;
  previous_training: string | null;
  training_method: string | null;
  play_behavior: string | null;
  phobias: Phobia[] | null;
  stimulus_reaction: string | null;
  repetitive_behavior: string | null;
  punishments_type: string | null;
  punishments_frequency: string | null;
  punishments_context: string | null;
  punishments_start: string | null;
  medical_history_type: string | null;
  medical_history_start: string | null;
  medical_history_frequency: string | null;
  consultation_observations: string | null;
  medical_problems: string | null;
  current_medication: string | null;
}

export interface OtherAnimal {
  species: string;
  breed: string;
  age: string;
  sex: string;
  reproductive_status: string;
}

export interface Phobia {
  description: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

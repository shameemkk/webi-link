import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useEventDataMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (eventData) => {
      const response = await axios.post("/api/events", eventData);
      return response.data;
    },
    onError: (err, newEvent, context) => {
      queryClient.setQueryData(["Ownevents"], context.previousEvents);
      if (err.response && err.response.data) {
        return err.response.data;
      }
      return { message: "An unexpected error occurred" };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Ownevents"] });
    },
  });
};

export const useEventUpdateMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ eventId, eventData }) => {
      const response = await axios.put(`/api/events/${eventId}`, eventData);
      return response.data;
    },
    onError: (err, newEvent, context) => {
      queryClient.setQueryData(["Ownevents"], context.previousEvents);
      if (err.response && err.response.data) {
        return err.response.data;
      }
      return { message: "An unexpected error occurred" };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Ownevents"] });
    },
  });
};

export const useEventDataList = () => {
  return useQuery({
    queryKey: ["Ownevents"],
    queryFn: async () => {
      const response = await axios.get("/api/events/getEventsByOrganizer");
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
};

export const useAllEventDataList = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await axios.get("/api/events/");
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
};

export const useEventDataById = (id) => {
  return useQuery({
    queryKey: ["eventById"],
    queryFn: async () => {
      const response = await axios.get(`/api/events/${id}`);
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
};

export const useEventRegisterMutate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (eventId ) => {
      const response = await axios.post(`/api/events/registerEvent/`, {eventId});
      return response.data;
    },
    onError: (err, newEvent, context) => {
      queryClient.setQueryData(["eventById"], context.previousEvents);
      if (err.response && err.response.data) {
        return err.response.data;
      }
      return { message: "An unexpected error occurred" };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventById"] });
    },
  });
};

export const useRegisteredEventList = () => {
  return useQuery({
    queryKey: ["Registeredevents"],
    queryFn: async () => {
      const response = await axios.get("/api/events/registered-events");
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
};
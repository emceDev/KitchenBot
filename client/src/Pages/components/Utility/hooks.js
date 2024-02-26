export const useUtilities = () => {
  let { m_id } = useParams();
  const { data, error, isLoading } = useGetUtilityListQuery(m_id);
  return { data, error, isLoading };
};

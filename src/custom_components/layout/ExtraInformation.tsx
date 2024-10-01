import { useInformationStore } from '@/store/useInformationStore'

export const ExtraInformation = () => {
  const { extraInformation } = useInformationStore()
  return (
    <div className="" id="infor">
      {extraInformation ?? null}
    </div>
  )
}

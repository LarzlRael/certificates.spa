import { useInformationStore } from '@/store/useInformationStore'

export const ExtraInformation = () => {
  const { extraInformation } = useInformationStore()
  return (
    <div className="flex-1 h-full overflow-y-auto" id="infor">
      {extraInformation ?? null}
    </div>
  )
}

import { useThemeStore } from '@/store/themeStore'

export const ExtraInformation = () => {
  const { informationInfo } = useThemeStore()
  return (
    <div className="" id="infor">
      {informationInfo ?? null}
    </div>
  )
}

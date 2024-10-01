import { useThemeStore } from '@/store/themeStore'

export const ExtraInformation = () => {
  const { extraInformation } = useThemeStore()
  return (
    <div className="" id="infor">
      {extraInformation ?? null}
    </div>
  )
}

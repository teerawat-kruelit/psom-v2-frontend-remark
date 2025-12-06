import { Phone } from 'lucide-react'

export const LoginFooter = () => {
  return (
    <footer className="flex w-full flex-col items-center gap-1 bg-gray-600 py-3 text-white">
      <p className="text-lg">แจ้งปัญหาใช้งาน</p>
      <p className="flex items-center gap-1 text-sm">
        <Phone fill="white" color="white" size={14} />
        065-5162600
      </p>
      <p className="text-sm">@hack_2016</p>
      <p className="text-sm">© สงวนลิขสิทธิ์ 2568 บริษัท โปโลเมคเกอร์ จำกัด</p>
    </footer>
  )
}

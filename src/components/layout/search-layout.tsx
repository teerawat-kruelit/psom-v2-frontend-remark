'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { useState, useEffect } from 'react'

interface SearchLayoutProps {
  selectorData: { key: string; label: string }[]
  onSearch: (key: string, value: string) => void
  data?: {
    key?: string
    value?: string
  }
}

export function SearchLayout({ selectorData, onSearch, data }: SearchLayoutProps) {
  const [searchKey, setSearchKey] = useState(data?.key || selectorData[0]?.key || '')
  const [searchValue, setSearchValue] = useState(data?.value || '')

  useEffect(() => {
    if (data?.key) setSearchKey(data.key)
    if (data?.value) setSearchValue(data.value)
  }, [data])

  const handleSearch = () => {
    onSearch(searchKey, searchValue)
  }

  return (
    <div className="flex w-full items-center gap-2">
      <Select value={searchKey} onValueChange={setSearchKey}>
        <SelectTrigger className="w-[150px]" size="sm">
          <SelectValue placeholder="ตัวเลือกการค้นหา" />
        </SelectTrigger>
        <SelectContent>
          {selectorData.map((item) => (
            <SelectItem key={item.key} value={item.key}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        size="sm"
        prefix={<Search />}
        className="w-full max-w-[200px] border-purple-200 bg-purple-100 focus-visible:border-purple-400 focus-visible:ring-purple-200"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch()
          }
        }}
      />
      <Button size="sm" color={'gray'} className="px-6" onClick={handleSearch}>
        ค้นหา
      </Button>
    </div>
  )
}

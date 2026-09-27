import { Search } from "lucide-react-native";
import { View, TextInput } from "react-native";

export function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (text: string) => void;
}) {
  return (
    <View className="h-[52px] rounded-2xl border border-slate-200 bg-slate-50 px-3 dark:border-slate-700 dark:bg-slate-800">
      <View className="h-full flex-row items-center translate-y-[20px]">
        <View className="h-full items-center mt-4 justify-center">
          <Search size={18} color="#94A3B8" />
        </View>
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder="Search appliances..."
          placeholderTextColor="#94A3B8"
          numberOfLines={1}
          multiline={false}
          returnKeyType="search"
          textAlignVertical="center"
          style={{
            flex: 1,
            paddingVertical: 0,
            paddingTop: 0,
            marginTop: 15,
            paddingBottom: 0,
          }}
          className="ml-3 text-sm text-slate-900 dark:text-slate-50"
        />
      </View>
    </View>
  );
}

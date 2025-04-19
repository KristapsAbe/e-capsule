import { memo } from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from "../../../LanguageContext";

const SearchInput = memo(({ value, onChange }) => {
    const { t } = useLanguage();

    return (
        <div className="relative w-full max-w-sm mb-6 sm:mb-12">
            <input
                type="text"
                placeholder={t('searchUsers')}
                className="w-full py-2 sm:py-3 px-4 sm:px-6 pr-10 rounded-full border-2 border-[#FF95DD] bg-background/50 text-text focus:outline-none focus:border-[#FF5CAA] transition-all duration-300"
                value={value}
                onChange={onChange}
            />
            <Search
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-pink-300"
                size={18}
            />
        </div>
    );
});

export default SearchInput;
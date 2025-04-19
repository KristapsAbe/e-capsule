import { memo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from "../../../LanguageContext";

const Pagination = memo(({ currentPage, totalPages, onPageChange }) => {
    const { t } = useLanguage();

    return (
        <div className="flex items-center justify-center gap-4 mt-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-full ${
                    currentPage === 1
                        ? 'text-text/30 cursor-not-allowed'
                        : 'text-[#FF95DD] hover:bg-[#FF95DD]/10'
                }`}
            >
                <ChevronLeft size={16} />
            </button>

            <span className="font-lexend text-text">
                {t('page')} {currentPage} {t('of')} {totalPages}
            </span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-full ${
                    currentPage === totalPages
                        ? 'text-text/30 cursor-not-allowed'
                        : 'text-[#FF95DD] hover:bg-[#FF95DD]/10'
                }`}
            >
                <ChevronRight size={16} />
            </button>
        </div>
    );
});

export default Pagination;
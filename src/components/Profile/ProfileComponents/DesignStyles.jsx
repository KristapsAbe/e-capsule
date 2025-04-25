import React from 'react';
import { Star, BookOpen, Heart, Shield } from 'lucide-react';

export const getDesignIcon = (design) => {
    const iconMap = {
        'heritage': <Star className="text-[#FFD700]" size={18} />,
        'chronicle': <BookOpen className="text-[#64DFDF]" size={18} />,
        'legacy': <Heart className="text-[#FF95DD]" size={18} />,
        'vault': <Shield className="text-[#A3E4DB]" size={18} />
    };
    return iconMap[design] || iconMap.heritage;
};

export const getDesignStyles = (design) => {
    const styles = {
        heritage: {
            container: 'bg-gradient-to-br from-[#382330] to-[#5E3762] border-[#B2779F] text-[#E5E6F0]',
            header: 'text-[#E5E6F0] bg-black/40',
            accent: '#FFD700',
            secondaryColor: '#B2779F',
            contentBg: 'bg-black/30 border-[#B2779F]/50',
            filter: 'brightness-95 contrast-110',
            icon: <Star className="text-[#FFD700]" size={18} />,
            pattern: 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTEwLDEwIEwzMCwxMCBMMzAsMzAgTDEwLDMwIFoiIHN0cm9rZT0iI0ZGRDcwMDIwIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiLz48L3N2Zz4=")]',
            boxShadow: '0 10px 25px -5px rgba(178, 119, 159, 0.4)',
            decorationGradient: 'radial-gradient(circle at center, #5E3762 0%, #382330 100%)',
            photoStack: 'bg-gradient-to-br from-[#453244] to-[#513452]',
            dateStamp: 'bg-[#382330]/80 text-[#E5E6F0]'
        },
        chronicle: {
            container: 'bg-gradient-to-r from-[#0D0E16] to-[#193A5A] border-[#64DFDF] text-[#E5E6F0]',
            header: 'text-[#E5E6F0] bg-black/40',
            accent: '#64DFDF',
            secondaryColor: '#A7ACCD',
            contentBg: 'bg-black/30 border-[#64DFDF]/50',
            filter: 'brightness-95 saturate-105',
            icon: <BookOpen className="text-[#64DFDF]" size={18} />,
            pattern: 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHJlY3Qgd2lkdGg9IjIiIGhlaWdodD0iMiIgeD0iMjkiIHk9IjI5IiBmaWxsPSIjNjRERkRGMzAiLz48L3N2Zz4=")]',
            boxShadow: '0 0 30px -5px rgba(100, 223, 223, 0.5)',
            decorationGradient: 'linear-gradient(135deg, #193A5A 0%, #0D0E16 100%)',
            photoStack: 'bg-gradient-to-r from-[#132336] to-[#1D3E5E]',
            dateStamp: 'bg-[#0D1624]/80 text-[#A7ACCD]'
        },
        legacy: {
            container: 'bg-gradient-to-br from-[#3D2C40] to-[#5E3762] border-[#FF95DD] text-[#E5E6F0]',
            header: 'text-[#E5E6F0] bg-black/40',
            accent: '#FF95DD',
            secondaryColor: '#FF95DD',
            contentBg: 'bg-black/30 border-[#FF95DD]/50',
            filter: 'brightness-100 contrast-110',
            icon: <Heart className="text-[#FF95DD]" size={18} />,
            pattern: 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cGF0aCBkPSJNMjUsMjUgQzI1LDUwIDc1LDUwIDc1LDI1IiBzdHJva2U9IiNGRjk1REQyMCIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTI1LDc1IEMyNSw1MCA3NSw1MCA3NSw3NSIgc3Ryb2tlPSIjRkY5NUREMjAiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==")]',
            boxShadow: '0 10px 25px -5px rgba(255, 149, 221, 0.3)',
            decorationGradient: 'linear-gradient(to bottom, #3D2C40 0%, #5E3762 100%)',
            photoStack: 'bg-gradient-to-br from-[#4D3D50] to-[#5E3762]',
            dateStamp: 'bg-[#3D2C40]/80 text-[#FF95DD]'
        },
        vault: {
            container: 'bg-gradient-to-r from-[#1A3A4A] to-[#30637C] border-[#A3E4DB] text-[#E5E6F0]',
            header: 'text-[#E5E6F0] bg-black/40',
            accent: '#A3E4DB',
            secondaryColor: '#A3688F',
            contentBg: 'bg-black/30 border-[#A3E4DB]/50',
            filter: 'brightness-95 contrast-110',
            icon: <Shield className="text-[#A3E4DB]" size={18} />,
            pattern: 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTMwLDEwIEwxMCwzMCBMMzAsNTAgTDUwLDMwIFoiIHN0cm9rZT0iI0EzRTREQjIwIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiLz48L3N2Zz4=")]',
            boxShadow: '0 10px 25px -5px rgba(163, 228, 219, 0.3)',
            decorationGradient: 'linear-gradient(135deg, #1A3A4A 0%, #30637C 100%)',
            photoStack: 'bg-gradient-to-r from-[#1F404E] to-[#2A5A70]',
            dateStamp: 'bg-[#1A3A4A]/80 text-[#A3E4DB]'
        }
    };
    return styles[design] || styles.heritage;
};
import React from 'react';
import Icon from '../VisualAspects/Icon';
import { useLanguage } from "../../../LanguageContext";

const CreateCapsuleWidget = () => {
    const { t } = useLanguage();
    const capsuleTypes = [
        { icon: 'camera', label: "Photo", labelKey: "photo" },
        { icon: 'note', label: "Note", labelKey: "note" },
        { icon: 'group', label: "Group", labelKey: "group" }
    ];

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
             className='bg-accent/10 backdrop-blur-lg p-5 rounded-2xl shadow-secondary border border-accent/30 relative overflow-hidden'>
            <div className="absolute top-0 right-0 w-20 h-20 bg-secondary/30 rounded-full blur-2xl -mr-5 -mt-5"></div>

            <div className='flex items-center mb-4' style={{ flexShrink: 0 }}>
                <div className="w-1 h-6 bg-button rounded-full mr-2"></div>
                <h3 className='text-text font-bold'>{t('createCapsuleTitle')}</h3>
            </div>

            <div className='flex justify-around my-4' style={{ flexGrow: 1 }}>
                {capsuleTypes.map((type, index) => (
                    <button key={index} className='flex flex-col items-center group'>
                        <div className='w-14 h-14 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center shadow-secondary group-hover:from-button group-hover:to-secondary transition-all duration-300'>
                            <Icon className="text-lg" name={type.icon} />
                        </div>
                        <span className='text-text text-xs mt-2 group-hover:text-button transition-colors'>{t(type.labelKey)}</span>
                    </button>
                ))}
            </div>

            <a href={"/CapsuleCreation"} style={{ marginTop: 'auto', flexShrink: 0 }}>
                <button
                    className='bg-gradient-to-r from-button to-btnOutline text-background font-bold py-2.5 rounded-full w-full border border-button/50 shadow-secondary flex items-center justify-center space-x-2 hover:from-button hover:to-button transition-all duration-300'>
                    <span>{t('createNew')}</span>
                    <Icon name="plus"/>
                </button>
            </a>
        </div>
    );
};

export default CreateCapsuleWidget;
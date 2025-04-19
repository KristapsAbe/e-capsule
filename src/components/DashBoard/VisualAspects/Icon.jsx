import React from 'react';
import {
    Camera,
    FileText,
    Users,
    Lock,
    Plane,
    Cake,
    File,
    Plus,
    Maximize2,
    ArrowRight,
    Heart,
    MessageSquare,
    Edit,
    Search,
    Sparkle,
    Bell,
    Star,
    Flame,
    Calendar,
    Settings,
    CornerDownRight,
    Save,
    Image,
    MapPin,
} from 'lucide-react';

const Icon = ({ name, className = "", size = 16, color }) => {
    const iconProps = {
        size,
        className,
        color
    };

    const icons = {
        camera: <Camera {...iconProps} />,
        note: <FileText {...iconProps} />,
        group: <Users {...iconProps} />,
        lock: <Lock {...iconProps} />,
        plane: <Plane {...iconProps} />,
        cake: <Cake {...iconProps} />,
        file: <File {...iconProps} />,
        plus: <Plus {...iconProps} />,
        expand: <Maximize2 {...iconProps} />,
        right: <ArrowRight {...iconProps} />,
        heart: <Heart {...iconProps} />,
        comment: <MessageSquare {...iconProps} />,
        edit: <Edit {...iconProps} />,
        filter: <Search {...iconProps} />,
        sparkle: <Sparkle {...iconProps} />,
        bell: <Bell {...iconProps} />,
        star: <Star {...iconProps} />,
        fire: <Flame {...iconProps} />,
        calendar: <Calendar {...iconProps} />,
        settings: <Settings {...iconProps} />,
        arrow: <CornerDownRight {...iconProps} />,
        memory: <Save {...iconProps} />,
        photos: <Image {...iconProps} />,
        pin: <MapPin {...iconProps} />
    };

    return icons[name] || <div className={`${className} w-${size} h-${size}`}>•</div>;
};

export default Icon;
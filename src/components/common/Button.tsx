import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import clsx from 'clsx';
import { ButtonProps } from '../../types/components'; // Assuming ButtonProps is defined here

// Type definitions (Typescript dəstəyi üçün zəruridir)
type ButtonVariant = 'primary' | 'outline';
type ArrowDirection = 'left' | 'right';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  showArrow,
  arrowDirection,
  className = '',
  ...props
}) => {
  // Logic (Məntiq)
  const isArrowVisibleByDefault = variant === 'primary';
  const defaultArrowDirection = variant === 'primary' ? 'right' : 'left';
  const shouldDisplayArrow = showArrow ?? isArrowVisibleByDefault;
  const arrowDirectionFinal = arrowDirection ?? defaultArrowDirection;

  // --- 1. Base Classes (Bütün variantlar üçün ümumi təməl stillər) ---
  const baseClasses = `
    font-medium 
    flex items-center justify-center 
    transition-all duration-200 
    font-inter 
    text-base 
    gap-2 
    px-6 py-3
    w-[18.3125rem] h-[3.5rem] 
  `; // Added concrete dimensions based on common component practices and the image

  // --- 2. Variant Classes (Hər variant üçün xüsusi stillər) ---
  const variantClasses = {
    primary: `
      bg-black 
      text-white 
      rounded-[1.5rem] 
      shadow-xl
      shadow-pink-900/50
      hover:scale-[1.02] 
      hover:bg-gray-800 
      relative 
      group
    `,
    outline: `
      bg-white 
      text-black 
      text-base font-semibold 
      rounded-[1.5rem] 
      border border-gray-300
      hover:bg-gray-50
      shadow-md
    `,
  };

  // --- 3. Arrow Classes (Variantdan asılı olaraq ox rəngi) ---
  const arrowClasses = clsx(
    'w-5 h-5',
    variant === 'primary' ? 'text-white' : 'text-black'
  );

  // Bütün sinifləri birləşdiririk
  const finalClasses = clsx(
    baseClasses, 
    variantClasses[variant], 
    className
  );

  // Primary variant üçün estetik qat (görüntüdəki qırmızı/çəhrayı parıltı effekti)
  const primaryOverlay = (
    <span
      className="absolute inset-0 rounded-[1.5rem]"
      style={{
        // Bu, kənar effektini yaradan gradientdir
        boxShadow: '0 0 20px 5px rgba(255, 100, 200, 0.5), 0 0 10px 1px rgba(255, 50, 150, 0.3)',
        WebkitMask:
          'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
      }}
    />
  );
  
  // Ox elementinin stilini də primary-nin daxilindəki məzmuna uyğunlaşdırmaq.
  // Görüntüdəki Google düyməsində ox yoxdur. SignUp düyməsində ox var.
  const arrowComponent = (
    arrowDirectionFinal === 'right' ? (
      <ArrowRight className={arrowClasses} />
    ) : (
      <ArrowLeft className={arrowClasses} />
    )
  );

  return (
    <button
      className={finalClasses}
      {...props}
    >
      {/* Primary variant üçün overlay/parıltı */}
      {variant === 'primary' && primaryOverlay}
      
      {/* Sol Ox */}
      {shouldDisplayArrow && arrowDirectionFinal === 'left' && arrowComponent}
      
      {/* Düymə Məzmunu (Rəngləri tətbiq etmək üçün məzmunu z-index yüksək olan span-a bükürük) */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      
      {/* Sağ Ox */}
      {shouldDisplayArrow && arrowDirectionFinal === 'right' && arrowComponent}
    </button>
  );
};

export default Button;

import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

export function AddOnCard({ addon, price, isSelected, onToggle }) {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'}`}
      onClick={() => onToggle(!isSelected)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox 
            checked={isSelected}
            onChange={() => {}} // Handled by card click
            className="mt-1"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">{addon.name}</h4>
              <div className="text-right">
                <span className="text-lg font-bold text-green-600">
                  +${price?.toFixed(2)}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-2">{addon.description}</p>
            {addon.duration_minutes > 0 && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>+{addon.duration_minutes} minutes</span>
              </div>
            )}
            {addon.is_recommended && (
              <Badge variant="secondary" className="mt-2">
                Recommended
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function AddOnManager() {
  const [addons, setAddons] = useState([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Service Add-Ons</h2>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Add-On
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
          {/* DataTable for add-ons would go here */}
        </CardContent>
      </Card>
    </div>
  );
} 
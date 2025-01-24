import { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Heart } from 'lucide-react';
import _ from 'lodash';

const SkillsAndInterests = () => {
  const [displayedHobbies, setDisplayedHobbies] = useState([]);
  const [displayedInterests, setDisplayedInterests] = useState([]);

  const hobbies = [
    'Gaming',
    'Art & Drawing',
    'Music Production',
    'Photography',
    'Skateboarding',
    'Basketball',
    'Animation',
    'Digital Art'
  ];

  const interests = [
    'Social Media',
    'Fashion',
    'K-pop',
    'Tech Gadgets',
    'Fitness',
    'Movies & TV',
    'Travel',
    'Food'
  ];

  useEffect(() => {
    setDisplayedHobbies(_.sampleSize(hobbies, 4));
    setDisplayedInterests(_.sampleSize(interests, 4));
  }, []);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-indigo-500" />
            <CardTitle className="text-sm font-medium text-gray-600">Hobbies</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {displayedHobbies.map((hobby, index) => (
              <Badge key={index} variant="outline" className="bg-indigo-100 text-indigo-800 border-none">
                {hobby}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-pink-500" />
            <CardTitle className="text-sm font-medium text-gray-600">Interests</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {displayedInterests.map((interest, index) => (
              <Badge key={index} variant="outline" className="bg-pink-100 text-pink-800 border-none">
                {interest}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsAndInterests;